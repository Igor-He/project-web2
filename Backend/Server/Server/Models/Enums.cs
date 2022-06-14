using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public enum UserType
    {
        Administrator = 0,
        Dostavljac = 1,
        Potrosac = 2
    }

    public enum UserStatus
    {
        Approved = 0,
        Reject = 1,
        Processing = 2
    }
}
