import Sidebar from "./sidebar/Sidebar";
import styled from "styled-components";
import { motion } from "framer-motion";
import { media } from "../styles/breakpoints";

const NavbarContainer = styled.div`
  height: 100px;
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  ${media.md} {
    height: 80px;
  }

  ${media.sm} {
    height: 70px;
  }

  ${media.xs} {
    height: 60px;
  }
`;

const Wrapper = styled.div`
  max-width: 1366px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 40px;

  ${media.xl} {
    max-width: 1200px;
    padding: 0 30px;
  }

  ${media.lg} {
    max-width: 992px;
    padding: 0 25px;
  }

  ${media.md} {
    justify-content: flex-end;
    padding: 0 20px;
  }

  ${media.sm} {
    padding: 0 15px;
  }

  ${media.xs} {
    padding: 0 10px;
  }
`;

const StyledMotionSpan = styled(motion.span)`
  font-weight: bold;

  ${media.md} {
    display: none;
  }
`;

const Social = styled.div`
  display: flex;
  gap: 20px;

  ${media.sm} {
    gap: 15px;
  }

  ${media.xs} {
    gap: 10px;
  }

  img {
    width: 18px;
    height: 18px;

    ${media.sm} {
      width: 16px;
      height: 16px;
    }

    ${media.xs} {
      width: 14px;
      height: 14px;
    }
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Sidebar />
      <Wrapper>
        <StyledMotionSpan
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
        </StyledMotionSpan>
      </Wrapper>
    </NavbarContainer>
  );
};

export default Navbar;