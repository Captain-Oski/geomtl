import { redirect } from 'next/navigation';

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  const {
    locale
  } = params;

  redirect(`/${locale}/apropos#contact`);
}
