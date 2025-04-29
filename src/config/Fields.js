export const profileFields = [
  {
    key: "classification",
    label: "사용자 구분",
    value: "Admin",
    type: "text",
    readonly: true,
  },
  {
    key: "department",
    label: "부서",
    value: "운영팀",
    type: "text",
    readonly: true,
  },
  { key: "id", label: "아이디", value: "vFRAS", type: "text", readonly: true },
  {
    key: "password",
    label: "비밀번호",
    value: "******",
    type: "text",
    readonly: true,
  },
  { key: "name", label: "이름", value: "홍길동", type: "text", readonly: true },
  { key: "phone", label: "휴대폰", value: "010-1234-5678", type: "text" , required : true },
  { key: "email", label: "이메일", value: "test@lguplus.co.kr", type: "email" , required : true},
];

// { key: 'department', label: '부서', type: 'select', options: ['운영팀', '개발팀', '인사팀'] }
