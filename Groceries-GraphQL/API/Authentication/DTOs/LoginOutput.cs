using DATA.Authentication;

namespace API.Authentication.DTOs
{
    public class LoginOutput
    {
        public string AccessToken { get; set; }
        public User User { get; set; }
    }
}
