using DATA.Models.Shared;
using DATA.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DATA.Models
{
    [BsonCollection("categories")]
    public class Category : Entity
    {
        public string Name { get; set; }
        public string IconName { get; set; }

    }
}
