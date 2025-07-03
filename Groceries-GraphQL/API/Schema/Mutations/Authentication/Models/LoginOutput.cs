using DATA.Authentication;

namespace API.Schema.Mutations.Authentication.Models
{
    public class LoginOutput
    {
        public string AccessToken { get; set; }
        public User User { get; set; }
    }
}
