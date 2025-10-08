import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

// propsの型を定義
type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ja">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;