import { auth } from "@/auth";
import { LoginError } from "@/features/auth/components/login-error";
import { GlobeComponent } from "@/features/globe/component/globe-component";

const GlobePage = async () => {
  const session = await auth();
  if (!session) {
    return <LoginError />;
  }
  return (
    <div>
      <GlobeComponent />
    </div>
  );
};

export default GlobePage;
