﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.DTOs
{
    public class CreateProductDto
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public string Ingredient { get; set; }
    }
}
