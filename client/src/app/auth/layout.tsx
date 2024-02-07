import { Container } from "./styles";

interface AuthLayoutProps {
  children?: React.ReactNode
};

const AuthLayout: React.FC<AuthLayoutProps> = ( { children } ) => {
  return(
    <Container>
      <div className="content">
        <div className="formArea">
          <div className="form">
            { children }
          </div>
        </div>
        <div className="aside">
          <a href="/">
            <img 
              src="/gm-auth.svg" 
              alt="GMChat" 
              draggable={false}
            />
          </a>
        </div>
      </div>
    </Container>
  );
};

export default AuthLayout;