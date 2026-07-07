import { HomeColumn } from "@/components/layout/home-column";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-x-clip">
      <HomeColumn>
        <div className="screen-line-top border-x border-line px-4 py-6 text-center text-sm text-muted-foreground">
          © {year} Ahmad Fikril Al Muzakki
        </div>
      </HomeColumn>
    </footer>
  );
}