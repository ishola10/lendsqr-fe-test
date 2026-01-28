import { sanitizeUser } from "../lib/api";

describe("sanitizeUser", () => {
  const mockValidUser = {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    profile: {
      fullName: "John Doe",
      gender: "Male"
    },
    socials: {
      twitter: "@john",
      facebook: "john.doe",
      instagram: "@john_insta"
    },
    dateJoined: "2023-01-01"
  };

  test("should return valid data as is (Positive Scenario)", () => {
    const sanitized = sanitizeUser(mockValidUser);
    expect(sanitized.username).toBe("john_doe");
    expect(sanitized.profile?.fullName).toBe("John Doe");
    expect(sanitized.socials?.twitter).toBe("@john");
  });

  test("should handle ReferenceError in username (Negative Scenario)", () => {
    const errorUser = {
      ...mockValidUser,
      username: "<ReferenceError: username is not defined>"
    };
    const sanitized = sanitizeUser(errorUser);
    expect(sanitized.username).toBe("john");
  });

  test("should handle undefined string in socials (Negative Scenario)", () => {
    const errorUser = {
      ...mockValidUser,
      socials: {
        twitter: "<ReferenceError: twitter is not defined>",
        facebook: "undefined",
        instagram: "@valid"
      }
    };
    const sanitized = sanitizeUser(errorUser);
    expect(sanitized.socials?.twitter).toBe("@john_doe"); 
    expect(sanitized.socials?.facebook).toBe("john_doe");
    expect(sanitized.socials?.instagram).toBe("@valid");
  });

  test("should sanitize non-standard date formats", () => {
    const user = {
      ...mockValidUser,
      dateJoined: "2023-12-Thursday"
    };
    const sanitized = sanitizeUser(user);
    expect(sanitized.dateJoined).toBe("2023-12-01");
  });

  test("should handle missing profile data", () => {
    const user = { ...mockValidUser, profile: undefined };
    const sanitized = sanitizeUser(user);
    expect(sanitized.profile).toBeUndefined();
  });
});
