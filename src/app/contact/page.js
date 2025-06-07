import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact | Ahmad Fikril Al Muzakki",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-20">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-8">Contact Me</h1>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
