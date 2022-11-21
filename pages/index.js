import React, { useEffect, useState } from 'react'
import axios from "axios";
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router';
import moment from "moment";
import "moment/locale/id";
import { useDebounce } from "use-debounce";
import { Empty } from 'antd';


const Index = () => {
  const router = useRouter()
  const [dataset, setDataset] = useState([])
  const [nama, setNama] = useState("")
  const [editData, setEditData] = useState(null)
  const [search, setSearch] = useState("");
  const [debounceSearch] = useDebounce(search, 400);

  const _getData = async () => {
    const { data, error } = await axios.get("http://127.0.0.1:3333/tugas", {
      params: {
        search
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
    if (data) {
      setDataset(data)
    }
    // console.log(data);
  }

  const _getProfile = async () => {
    const { data, error } = await axios.get("http://127.0.0.1:3333/user/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    }).catch(() => { router.push("/login"); });
    // if (data) {
    //   setNama(data?.nama)
    // }

  }

  const handleEdit = async (e) => {
    setEditData(e)

    const form = new FormData(e.target);

    const formData = Object.fromEntries(form);

    const { data } = await axios.put(`http://127.0.0.1:3333/tugas/${editData?.id}`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
    if (data) {
      window.location.reload()
    }
  }

  const handleDelete = async (e) => {
    const { data } = await axios.delete(`http://127.0.0.1:3333/tugas/${e}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
    if (data) {
      window.location.reload()
    }
  }

  const tambahTugas = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    const formData = Object.fromEntries(form);

    console.log(formData);

    const { data } = await axios.post("http://127.0.0.1:3333/tugas", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
    if (data) {
      window.location.reload()
    }
  }

  const formatDeadline = (deadline) => {
    return moment(deadline).fromNow();
  };

  console.log(dataset);

  useEffect(() => {
    _getData();
    _getProfile();
  }, [debounceSearch])


  return (
    <>
      <Navbar nama={nama} />
      <div className="container mt-2">
        <div className="d-flex justify-content-between">
          <h2>Daftar Tugas</h2>
          <div className='d-flex'>
            <input
              type="text"
              className="form-control me-3 rounded-pill fs-12"
              placeholder="Cari Deskripsi"
              aria-label="Username"
              style={{ color: "#B4B7C5" }}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tambahTugas">Tambah</button>
          </div>
        </div>

        <table class="table mt-2">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Deadline</th>
              <th scope="col">Deskripsi</th>
              <th scope="col">Opsi</th>
            </tr>
          </thead>
          {dataset?.length ? (
            <tbody>
              {dataset?.map((d, idx) => {
                return (
                  <tr>
                    <th scope="row">{idx + 1}</th>
                    <td>{formatDeadline(d?.deadline)}</td>
                    <td>{d?.deskripsi}</td>
                    <td>
                      <button type="button" className="btn btn-secondary me-3" data-bs-toggle="modal" data-bs-target="#tambahTugas" onClick={() => handleEdit(d)}>Edit</button>
                      <button type="button" className="btn btn-danger" onClick={() => handleDelete(d?.id)}>Delete</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={4}>
                  <Empty />
                </td>
              </tr>
            </tbody>
          )
          }
        </table>
      </div>

      <div class="modal fade" id="tambahTugas" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{editData?.id ? "Edit" : "Tambah"} Tugas</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditData(null)}></button>
            </div>
            <form action="" onSubmit={editData?.id ? handleEdit : tambahTugas}>
              <div class="modal-body">
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label">Pilih Tanggal Deadline</label>
                  <input className="form-control" name='deadline' placeholder="Masukkan deadline" defaultValue={moment(editData?.deadline).format('YYYY-MM-DD')} />
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Deskripsi</label>
                  <input className="form-control" name='deskripsi' placeholder="Masukkan deskripsi" defaultValue={editData?.deskripsi} />
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setEditData(null)}>Close</button>
                <button type="submit" class="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  )
}

export default Index