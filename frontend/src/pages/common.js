import styled from "styled-components";

export const BoxContainer = styled.div `
  width: 100%;
  max-width: 380px;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12);
  overflow: hidden;
`;

export const FormContainer = styled.form `
  width: 100%;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const Input = styled.input `
  width: 100%;
  height: 46px;
  padding: 0 14px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #f59e0b;
  }
`;

export const SubmitButton = styled.button `
  width: 80%;
  height: 48px;
  border-radius: 24px;
  background: #fbbf24;
  color: white;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #f59e0b;
  }
`;

export const MutedLink = styled.a `
  font-size: 12px;
  color: #9ca3af;
  text-decoration: none;
  cursor: pointer;
`;

export const BoldLink = styled.a `
  font-size: 13px;
  color: #f59e0b;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
`;

export const LineText = styled.p `
  font-size: 13px;
  color: #9ca3af;
  text-align: center;
`;