import React from 'react';

type Props = {
  data: {
    firstNameLastName: string;
    jobTitle: string;
    emailAddress: string;
    id: string;
  };
  isSelected: boolean
  handleCardSelect: (personId: string) => void
};

function PersonInfo(props: Props) {
  const { data, handleCardSelect, isSelected } = props;

  return (
    <div
      className={isSelected ? "person-info selected" : "person-info"}
      onClick={() => handleCardSelect(data.id)}
    >
      <div className="firstNameLastName">{data.firstNameLastName}</div>
      <div className="jobTitle">{data.jobTitle}</div>
      <div className="emailAddress">{data.emailAddress}</div>
    </div>
  );
}

export default PersonInfo;
