import React from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  createdAt?: string;
};

type Props = {
  selectedUser: User | null;
  editRole: string;
  setEditRole: React.Dispatch<React.SetStateAction<string>>;
  handleRoleUpdate: (e: React.FormEvent) => Promise<void>;
};

export default function UserRoleModal({ selectedUser, editRole, setEditRole, handleRoleUpdate }: Props) {
  return (
    <dialog id="role_modal" className="modal">
      <div className="modal-box max-w-sm bg-base-100">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {selectedUser && (
          <form onSubmit={handleRoleUpdate}>
            <h3 className="text-center font-bold text-lg mb-4 text-base-content">Edit User Role</h3>
            <div className="flex flex-col gap-3">
              <div>
                <label className="label"><span className="label-text">Name</span></label>
                <input readOnly value={selectedUser.name} className="input input-bordered w-full bg-base-200" />
              </div>
              <div>
                <label className="label"><span className="label-text">Email</span></label>
                <input readOnly value={selectedUser.email} className="input input-bordered w-full bg-base-200" />
              </div>
              <div>
                <label className="label"><span className="label-text">Role</span></label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="select select-bordered w-full bg-base-200"
                  required
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <button type="submit" className="btn text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-sky-600 hover:to-teal-600 border-none w-full mt-2">
                Update Role
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
