import { permanentRedirect } from 'next/navigation';

// Old static demo page. Profile pages now live at /products/<brand>/<profile>
// with content from the dashboard, so this address goes to the products list.
export default function ProfileDetailPage() {
  permanentRedirect('/products');
}
