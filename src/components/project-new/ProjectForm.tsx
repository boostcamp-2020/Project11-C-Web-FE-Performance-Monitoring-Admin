import React from 'react';
import styled from 'styled-components';

const ProjectFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 2rem 0;
`;

const InputTitle = styled.span`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
`;

const InputText = styled.input`
  width: 50rem;
  padding: 0.2rem 0.4rem;
  border: none;
  border-bottom: 0.2rem solid rgba(255, 255, 255, 0.4);
  font-size: 1.5rem;
  background: transparent;
  &:focus {
    border-bottom: 0.2rem solid rgba(255, 255, 255, 0.8);
    outline: none;
  }
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ProjectForm = ({ title, setTitle, setDescription }) => {
  const changeTitle = (evt: React.BaseSyntheticEvent<any>) => {
    const value = evt.nativeEvent.data === ' ' ? `${title}-` : evt.target.value;
    setTitle(value);
  };

  const changeDescription = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(evt.target.value);
  };

  return (
    <>
      <p>Project title and description</p>
      <ProjectFormWrapper>
        <InputWrapper>
          <InputTitle>Project title</InputTitle>
          <InputText
            type="text"
            placeholder="Please enter a project title"
            value={title}
            onChange={changeTitle}
          />
        </InputWrapper>
        <InputWrapper>
          <InputTitle>Project description</InputTitle>
          <InputText
            type="text"
            placeholder="Please enter a project description"
            onChange={changeDescription}
          />
        </InputWrapper>
      </ProjectFormWrapper>
    </>
  );
};

export default ProjectForm;
