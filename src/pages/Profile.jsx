import React from "react";
import "./Pages.css";
import Button from "../components/Button";

const Profile = () => {
  const user = {
    classification: "Admin",
    department: "운영팀",
    id: "vFRAS",
    password: "******",
    name: "홍길동",
    phone: "010-1234-5678",
    email: "test@lguplus.co.kr",
  };

  return (
    <div>
      <table className="user-info-table">
        <tbody>
          <tr>
            <td className="label">사용자 구분</td>
            <td className="value">{user.classification}</td>
          </tr>
          <tr>
            <td className="label">부서</td>
            <td className="value">{user.department}</td>
          </tr>
          <tr>
            <td className="label">아이디</td>
            <td className="value">{user.id}</td>
          </tr>
          <tr>
            <td className="label">비밀번호</td>
            <td className="value">{user.password} <button>비밀번호 변경</button></td>
          </tr>
          <tr>
            <td className="label">이름</td>
            <td className="value">{user.name}</td>
          </tr>
          <tr>
            <td className="label">휴대폰</td>
            <td className="value">{user.phone}</td>
          </tr>
          <tr>
            <td className="label">이메일</td>
            <td className="value">{user.email}</td>
          </tr>
        </tbody>
      </table>
      <div style={{display:'flex'}}>
        <Button type='confirm' />
        <Button type='cancel' />
      </div>
    </div>
  );
};

export default Profile;
