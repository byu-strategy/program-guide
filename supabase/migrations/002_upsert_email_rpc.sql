-- Helper function for seeding emails with expression-based unique index
CREATE OR REPLACE FUNCTION upsert_email(
    p_person_id bigint,
    p_address text,
    p_type text,
    p_source text
) RETURNS void AS $$
BEGIN
    INSERT INTO emails (person_id, address, type, source)
    VALUES (p_person_id, p_address, p_type, p_source)
    ON CONFLICT (person_id, lower(address)) DO UPDATE
    SET last_seen_at = now(),
        type = COALESCE(EXCLUDED.type, emails.type),
        source = COALESCE(EXCLUDED.source, emails.source);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
