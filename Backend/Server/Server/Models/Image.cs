﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Image
    {
        [Key]
        public string UserId { get; set; }
        public byte[] Data { get; set; }
    }
}
