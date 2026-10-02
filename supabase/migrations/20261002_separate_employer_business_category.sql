-- Keep the employer's industry/category separate from verification classification.
alter table public.users
  add column if not exists business_category text;

-- Preserve existing industry values such as Retail, Restaurant, SME, etc.
-- Verification type is selected separately on the verification form.
update public.users
set business_category = business_type,
    business_type = case
      when verification_status = 'submitted'
        and nullif(trim(ssm_number), '') is not null
        and nullif(trim(registration_doc_name), '') is not null
        and nullif(trim(contact_doc_name), '') is not null
        and (lower(business_type) like '%e-commerce%' or lower(business_type) like '%online seller%')
        then 'Online Seller / E-commerce'
      when verification_status = 'submitted'
        and nullif(trim(ssm_number), '') is not null
        and nullif(trim(registration_doc_name), '') is not null
        and nullif(trim(contact_doc_name), '') is not null
        then 'Company / Business'
      else null
    end
where role = 'employer'
  and business_type is not null
  and business_type not in (
    'Individual Hirer',
    'Company / Business',
    'Online Seller / E-commerce'
  )
  and business_category is null;
