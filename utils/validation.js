const z = require("zod");

//input validation is done using zod library

const SchoolSchema = z.object({
  name: z.string().min(1, { message: "Valid school name is required" }),

  address: z.string().min(1, { message: "Valid address is required" }),

  latitude: z.coerce.number().refine((val) => val >= -90 && val <= 90, {
    message: "Latitude must be between -90 and 90",
  }),

  longitude: z.coerce.number().refine((val) => val >= -180 && val <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});

const CoordinatesSchema = z.object({
  latitude: z.coerce.number().refine((val) => val >= -90 && val <= 90, {
    message: "Latitude must be between -90 and 90",
  }),

  longitude: z.coerce.number().refine((val) => val >= -180 && val <= 180, {
    message: "Longitude must be between -180 and 180",
  }),
});

const validateSchoolInput = (school) => {
  const result = SchoolSchema.safeParse(school);

  if (result.success) {
    return {
      isValid: true,
      errors: [],
    };
  }
  else {
    return {
      isValid: false,
      errors: result.error.errors.map((err) => err.message),
    };
  }
};

const validateCoordinates = (lat, lng) => {
  const result = CoordinatesSchema.safeParse({ latitude: lat, longitude: lng });
  
  if (result.success) {
    return {
      isValid: true,
      errors: [],
    };
  } 
  else {
    return {
      isValid: false,
      errors: result.error.errors.map((err) => err.message),
    };
  }
};

module.exports = { validateSchoolInput, validateCoordinates };
