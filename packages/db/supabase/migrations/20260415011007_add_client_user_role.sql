ALTER TABLE public.users ALTER column role set default 'client';
ALTER TABLE public.users add check (role in ('admin', 'staff', 'client'));