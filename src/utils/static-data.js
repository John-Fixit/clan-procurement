export const roles = [
  {
    value: "is_admin",
    label: "Admin",
    description: "Full system access and control",
    color: "bg-purple-100 text-purple-700",
  },
  {
    value: "is_approver",
    label: "Approving Officer",
    description: "Can approve and reject procurement requests",
    color: "bg-blue-100 text-blue-500",
  },
  {
    value: "is_enroller",
    label: "Enrollment Officer",
    description: "Can enroll vendors and manage registrations",
    color: "bg-green-100 text-green-700",
  },
];

export const projectTypeList = [
  { label: "Job Order", value: "1" },
  {
    label: "Local Purchase Order",
    value: "2",
  },
];
