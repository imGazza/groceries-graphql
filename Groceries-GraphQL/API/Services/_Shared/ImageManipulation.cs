using DATA.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace API.Services.Shared
{
    public class ImageManipulation
    {
        private const int MaxProductImageSize = 400;
        private const double ProductImageAspectRatio = 16.0 / 9.0; // 16:9 aspect ratio

        public async static Task<ProductImage> GenerateProductImage(IFile file)
        {
            ValidateImage(file);
            return await GenerateDBImage(file);
        }

        private static void ValidateImage(IFile file)
        {
            if (!IsValidImage(file))
            {
                throw new ArgumentException("The uploaded image is not valid");
            }
        }

        private static bool IsValidImage(IFile file)
        {
            if (file == null || file.Length == 0)
                return false;

            var validContentTypes = new[] { "image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp" };
            return validContentTypes.Contains(file.ContentType);
        }

        private async static Task<ProductImage> GenerateDBImage(IFile file)
        {
            using var memoryStream = new MemoryStream();
            await file.CopyToAsync(memoryStream);

            var resizedImage = await ResizeImage(memoryStream.ToArray(), ProductImageAspectRatio);

            return new ProductImage
            {
                Data = resizedImage.imageData,
                Width = resizedImage.width,
                Height = resizedImage.height
            };
        }

        // Resize the image using ImageSharp
        private async static Task<(byte[] imageData, int width, int height)> ResizeImage(byte[] imageBytes, double aspectRatio)
        {
            using var image = Image.Load(imageBytes);
            
            int targetWidth, targetHeight;

            if (aspectRatio >= 1) // Landscape or square
            {
                targetWidth = MaxProductImageSize;
                targetHeight = (int)(MaxProductImageSize / aspectRatio);
            }
            else // Portrait
            {
                targetHeight = MaxProductImageSize;
                targetWidth = (int)(MaxProductImageSize * aspectRatio);
            }

            image.Mutate(x => x
                .Resize(new ResizeOptions
                {
                    Size = new Size(targetWidth, targetHeight),
                    Mode = ResizeMode.Crop, // This crops to exact dimensions
                    Position = AnchorPositionMode.Center // Crop from center
                }));

            using var ms = new MemoryStream();
            await image.SaveAsJpegAsync(ms);
            return (ms.ToArray(), image.Size.Width, image.Size.Height);
        }
    }
}
