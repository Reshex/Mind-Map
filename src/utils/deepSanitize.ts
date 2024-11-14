export default function deepSanitize(data: any): any {
    if (Array.isArray(data)) {
      return data.map(deepSanitize); // Recursively sanitize each array element
    } else if (typeof data === "object" && data !== null) {
      const sanitizedObject: any = {};
      for (const key in data) {
        if (typeof data[key] !== "function") {
          // Exclude functions
          sanitizedObject[key] = deepSanitize(data[key]);
        }
      }
      return sanitizedObject;
    }
    return data; // Return value if it is not an object or array (primitive type)
  }