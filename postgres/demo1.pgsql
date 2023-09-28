SELECT a.first_name || ' ' || a.last_name as actor, f.title
from public.actor as a
right outer join public.film_actor as fa
    on a.actor_id=fa.actor_id
right outer join public.film as f
    on f.film_id=fa.film_id
where fa.actor_id is null;