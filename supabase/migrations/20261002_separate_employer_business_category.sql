-- Keep the employer's industry/category separate from verification classification.
alter table public.users
  add column if not exists business_category text;

-- Preserve existing industry values such as Retail, Restaurant, SME, etc.
-- Verification type is selected separately on the verification form.
update public.users
set business_category = business_type,
    business_type = null
where role = 'employer'
  and business_type is not null
  and business_type not in (
    'Individual Hirer',
    'Company / Business',
    'Online Seller / E-commerce'
  )
  and business_category is null;
