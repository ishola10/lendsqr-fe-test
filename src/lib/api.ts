import usersData from "@/data/users.json";
import { User } from "@/types/user";

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const sanitizeUser = (user: any): User => {
  const isErrorString = (val?: unknown) => 
    typeof val === 'string' && (val.includes("ReferenceError") || val.includes("undefined"));

  const cleanUsername = (uname?: string, email?: string) => {
    if (!uname || isErrorString(uname)) {
      return email ? email.split('@')[0] : "user";
    }
    return uname;
  };

  const cleanDate = (dateString?: string) => {
    if (!dateString || isErrorString(dateString)) return undefined;
    if (dateString.includes('-')) {
        const parts = dateString.split('-');
        if (parts.length >= 2) {
            const year = parts[0];
            const month = parts[1].padStart(2, '0');
            let day = "01";
            if (parts[2] && !isNaN(parseInt(parts[2]))) {
                day = parts[2].padStart(2, '0');
            }
            return `${year}-${month}-${day}`;
        }
    }
    return dateString;
  };

  const cleanProfile = (profile: any) => {
    if (!profile) return undefined;
    return {
      ...profile,
      fullName: isErrorString(profile.fullName) ? cleanUsername(user.username, user.email) : profile.fullName
    };
  };

  const cleanSocials = (socials: any) => {
    if (!socials) return undefined;
    return {
      twitter: isErrorString(socials.twitter) ? `@${cleanUsername(user.username, user.email)}` : socials.twitter,
      facebook: isErrorString(socials.facebook) ? cleanUsername(user.username, user.email) : socials.facebook,
      instagram: isErrorString(socials.instagram) ? `@${cleanUsername(user.username, user.email)}` : socials.instagram,
    };
  };

  return {
    ...user,
    username: cleanUsername(user.username, user.email),
    userName: cleanUsername(user.userName, user.email),
    dateJoined: cleanDate(user.dateJoined),
    createdAt: cleanDate(user.createdAt),
    profile: cleanProfile(user.profile),
    socials: cleanSocials(user.socials)
  } as User;
};

export async function fetchUsers(): Promise<User[]> {
  await delay(600);
  return (usersData as any[]).map(sanitizeUser);
}

export async function fetchUserById(id: string): Promise<User | null> {
  await delay(400);
  const user = (usersData as any[]).find(u => u.id === id);
  return user ? sanitizeUser(user) : null;
}
