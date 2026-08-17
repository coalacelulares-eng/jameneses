-- Set up storage policies for property-images
create policy "Public Access to Property Images"
on storage.objects for select
to public
using (bucket_id = 'property-images');

create policy "Admin Upload Property Images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'property-images');

create policy "Admin Delete Property Images"
on storage.objects for delete
to authenticated
using (bucket_id = 'property-images');
