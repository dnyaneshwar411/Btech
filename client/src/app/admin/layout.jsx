import AuthGuardian from "@/components/core/AuthGuardian";

export default function RootLayout({ children }) {
  return (
    <AuthGuardian>
      {children}
    </AuthGuardian>
  );
}