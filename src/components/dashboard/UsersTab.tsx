"use client";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  createdAt?: string;
};

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  loading: boolean;
};

const PAGE_SIZE = 8;

export default function UsersTab({ users, setUsers, loading }: Props) {
  const [userPage, setUserPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState("");

  const totalPages = Math.ceil(users.length / PAGE_SIZE);
  const paginated = users.slice((userPage - 1) * PAGE_SIZE, userPage * PAGE_SIZE);

  const handleStatusToggle = async (u: User) => {
    const newStatus = u.status === "blocked" ? "active" : "blocked";
    const res = await fetch(`/api/users/${u.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) setUsers(users.map((x) => x._id === u._id ? { ...x, status: newStatus } : x));
  };

  const handleDelete = async (u: User) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: u.email,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    const res = await fetch(`/api/users/${u.email}`, { method: "DELETE" });
    if (res.ok) setUsers(users.filter((x) => x._id !== u._id));
  };

  const handleRoleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    const res = await fetch(`/api/users/${selectedUser.email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: editRole }),
    });
    if (res.ok) {
      setUsers(users.map((x) => x._id === selectedUser._id ? { ...x, role: editRole } : x));
      (document.getElementById("role_modal") as HTMLDialogElement)?.close();
      Swal.fire({ title: "Role Updated!", icon: "success", timer: 1500, showConfirmButton: false });
    }
  };

  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-base-300 flex items-center justify-between">
        <h2 className="text-xl font-bold text-base-content">Manage Users</h2>
        <span className="badge badge-outline">{users.length} total</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <span className="loading loading-spinner loading-lg text-sky-500" />
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-300 text-base-content/70 text-sm">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((u, i) => (
                  <tr key={u._id} className="hover:bg-base-300/50 border-b border-base-300">
                    <td className="text-base-content/40 text-sm">{(userPage - 1) * PAGE_SIZE + i + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 font-bold text-sm shrink-0">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-base-content text-sm">{u.name}</p>
                          <p className="text-base-content/40 text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge text-xs capitalize ${u.role === "admin" ? "badge-warning text-white" : "badge-ghost"}`}>
                        {u.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge text-xs capitalize text-white ${u.status === "blocked" ? "badge-error" : "badge-success"}`}>
                        {u.status || "active"}
                      </span>
                    </td>
                    <td className="text-base-content/40 text-xs">
                      {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleStatusToggle(u)}
                          className={`btn btn-xs text-white ${u.status === "blocked" ? "btn-success" : "btn-warning"}`}
                        >
                          {u.status === "blocked" ? "Unblock" : "Block"}
                        </button>
                        <button onClick={() => handleDelete(u)} className="btn btn-xs btn-error text-white">
                          <FaTrash size={11} />
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setSelectedUser(u);
                          setEditRole(u.role);
                          (document.getElementById("role_modal") as HTMLDialogElement)?.showModal();
                        }}
                        className="btn btn-xs btn-outline"
                      >
                        Edit Role
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3 p-4">
            {paginated.map((u, i) => (
              <div key={u._id} className="border border-base-300 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-600 font-bold shrink-0">
                    {u.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-base-content truncate">{u.name}</p>
                    <p className="text-xs text-base-content/40 truncate">{u.email}</p>
                  </div>
                  <span className="text-xs text-base-content/40">#{(userPage - 1) * PAGE_SIZE + i + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                  <div>
                    <p className="text-xs text-base-content/40 mb-1">Role</p>
                    <span className={`badge text-xs capitalize ${u.role === "admin" ? "badge-warning text-white" : "badge-ghost"}`}>
                      {u.role}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-base-content/40 mb-1">Status</p>
                    <span className={`badge text-xs capitalize text-white ${u.status === "blocked" ? "badge-error" : "badge-success"}`}>
                      {u.status || "active"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleStatusToggle(u)}
                    className={`btn btn-xs flex-1 text-white ${u.status === "blocked" ? "btn-success" : "btn-warning"}`}
                  >
                    {u.status === "blocked" ? "Unblock" : "Block"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUser(u);
                      setEditRole(u.role);
                      (document.getElementById("role_modal") as HTMLDialogElement)?.showModal();
                    }}
                    className="btn btn-xs flex-1 btn-outline"
                  >
                    Edit Role
                  </button>
                  <button onClick={() => handleDelete(u)} className="btn btn-xs btn-error text-white">
                    <FaTrash size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 p-4 border-t border-base-300">
              <button
                onClick={() => setUserPage((p) => Math.max(1, p - 1))}
                disabled={userPage === 1}
                className="btn btn-sm btn-ghost disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setUserPage(p)}
                  className={`btn btn-sm ${p === userPage ? "btn-primary text-white" : "btn-ghost"}`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setUserPage((p) => Math.min(totalPages, p + 1))}
                disabled={userPage === totalPages}
                className="btn btn-sm btn-ghost disabled:opacity-40"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Role edit modal */}
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
                <button type="submit" className="btn btn-primary text-white w-full mt-2">
                  Update Role
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
}
