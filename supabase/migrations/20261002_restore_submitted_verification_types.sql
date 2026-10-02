-- Restore a valid verification classification for complete packages whose old
-- business_type value was an industry label (for example, Retail).
update public.users
set business_type = case
  when lower(coalesce(business_category, '')) like '%e-commerce%'
    or lower(coalesce(business_category, '')) like '%online seller%'
    then 'Online Seller / E-commerce'
  else 'Company / Business'
end
where role = 'employer'
  and business_type is null
  and verification_status = 'submitted'
  and nullif(trim(ssm_number), '') is not null
  and nullif(trim(registration_doc_name), '') is not null
  and nullif(trim(contact_doc_name), '') is not null;
