import { createClient } from "./server";
import type { UserRole } from "@/types/database";

/**
 * Fetch all rows from a table, paginating past the 1000-row default limit.
 */
export async function fetchAllPaginated<T>(
  supabase: Awaited<ReturnType<typeof createClient>>,
  table: string,
  options?: {
    select?: string;
    orderBy?: { column: string; ascending?: boolean };
  }
): Promise<T[]> {
  const PAGE_SIZE = 1000;
  const allRows: T[] = [];
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    let q = supabase.from(table).select(options?.select || "*");

    if (options?.orderBy) {
      q = q.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }

    const { data, error } = await q.range(offset, offset + PAGE_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    allRows.push(...(data as T[]));
    hasMore = data.length === PAGE_SIZE;
    offset += PAGE_SIZE;
  }

  return allRows;
}

/**
 * Get the current authenticated user's profile (server component).
 */
export async function getCurrentUserProfile() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return profile
    ? { ...profile, email: user.email }
    : null;
}

/**
 * Get the current user's role. Returns null if not authenticated.
 */
export async function getUserRole(): Promise<UserRole | null> {
  const profile = await getCurrentUserProfile();
  return (profile?.role as UserRole) ?? null;
}

/**
 * Check if a user is an active consortium member (by user_id).
 */
export async function isConsortiumMember(userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("consortium_members")
    .select("id")
    .eq("user_id", userId)
    .eq("is_active", true)
    .limit(1)
    .single();
  return !!data;
}

/**
 * Get user role + consortium status together (avoids duplicate queries).
 */
export async function getUserAccess() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null, role: null as UserRole | null, isConsortium: false };

  const { data: profile } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const role = (profile?.role as UserRole) ?? null;

  let isConsortium = false;
  if (role === "employer") {
    const { data: cm } = await supabase
      .from("consortium_members")
      .select("id")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .limit(1)
      .single();
    isConsortium = !!cm;
  }

  return {
    user,
    profile: profile ? { ...profile, email: user.email } : null,
    role,
    isConsortium,
  };
}
