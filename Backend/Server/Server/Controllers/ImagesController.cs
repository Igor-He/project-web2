﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Controllers
{
    [Route("api/images")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly CRUD_OtherResourcesContext _context;
        private readonly UserManager<User> _userManager;

        public ImagesController(CRUD_OtherResourcesContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        // GET: api/Images/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImage(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            var image = await _context.Image.FindAsync(user.Email);

            if (image == null)
            {
                return new Image();
            }

            return image;
        }

        // PUT: api/Images/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutImage()
        {
            Image image = new Image();

            if (Request.Form.Files.Count > 0)
            {

                var file = Request.Form.Files[0];
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    image.Data = stream.ToArray();
                    image.UserId = Request.Form["id"];
                }
            }

            _context.Entry(image).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(image.UserId))
                {
                    if (Request.Form.Files.Count > 0)
                    {
                        string id = Request.Form["id"];
                        var file = Request.Form.Files[0];
                        using (var stream = new MemoryStream())
                        {
                            await file.CopyToAsync(stream);
                            image.Data = stream.ToArray();
                            image.UserId = id;
                        }
                    }
                    _context.Image.Add(image);
                    try
                    {
                        await _context.SaveChangesAsync();
                    }
                    catch (DbUpdateException)
                    {
                        if (ImageExists(image.UserId))
                        {
                            return Conflict();
                        }
                        else
                        {
                            throw;
                        }
                    }

                    return Ok();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Images
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Image>> PostImage()
        {
            Image image = new Image();
            if (Request.Form.Files.Count > 0)
            {
                string id = Request.Form["id"];
                var file = Request.Form.Files[0];
                using (var stream = new MemoryStream())
                {
                    await file.CopyToAsync(stream);
                    image.Data = stream.ToArray();
                    image.UserId = id;
                }
            }
            _context.Image.Add(image);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ImageExists(image.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        private bool ImageExists(string id)
        {
            return _context.Image.Any(e => e.UserId == id);
        }
    }
}
