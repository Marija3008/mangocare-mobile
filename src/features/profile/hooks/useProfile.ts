import { useQuery } from "@tanstack/react-query";

import { profileService } from "@/features/profile/services/profileService";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: profileService.getProfile,
  });
}