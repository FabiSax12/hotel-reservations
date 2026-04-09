import { createSupabaseClient, createSupabaseServiceClient } from "@hotel/db";
import { AdminUser } from "@hotel/db/types";

/**
 * 
 * @param email 
 * @param password 
 * @returns 
 */
export async function signInWithPassword(email: string, password: string) {
    const supabase = createSupabaseClient();
    const {data, error} = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function signOut() {
    const supabase = createSupabaseClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
        throw new Error(error.message);
    }
}

export async function getSession() {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase.auth.getSession();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function verifyAdminRole(userId: string): Promise<AdminUser | null> {

    const supabase = createSupabaseServiceClient();

    const { data, error } = await supabase.from('users')
        .select('id, email, role, is_active')
        .eq('id', userId)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    if (data.role === 'admin' && data.is_active) {
        return data as AdminUser;
    }

    return null;
}