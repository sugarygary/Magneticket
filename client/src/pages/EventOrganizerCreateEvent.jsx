import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import upload from "../assets/upload.png";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { createEvent } from "../handlers/EventOrganizerHandler";
import { kotaDanKabupaten } from "../util/kotaDanKabupaten";
import CardKategoriTiketEvent from "../components/CardKategoriTiketEvent";

export default function EventOrganizerCreateEvent() {
  const { current_user, status } = useSelector((state) => state.user);
  const [nama, setNama] = useState(null);
  const [venue, setVenue] = useState(null);
  const [address, setAddress] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [surat, setSurat] = useState(null);
  const [deskripsi, setDeskripsi] = useState(null);
  const [kategoriTiket, setKategoriTiket] = useState("");
  const [hargaTiket, setHargaTiket] = useState("");
  const [slotTiket, setSlotTiket] = useState("");
  const [kategori, setKategori] = useState([]);
  const [informasiKategori, setInformasiKategori] = useState(null);
  const [kota, setKota] = useState(null);
  const [syaratKetentuan, setSyaratKetentuan] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorMessageMulter, setErrorMessageMulter] = useState(null);
  const [poster, setPoster] = useState(null);
  const [banner, setBanner] = useState(null);
  const [boolAddKategori, setBoolAddKategori] = useState(true);
  const navigate = useNavigate();

  const handleKategoriTicket = (data) => {
    setKategoriTiket(data);
  };

  const handleHargaTicket = (data) => {
    setHargaTiket(data);
  };

  const handleSlotTicket = (data) => {
    setSlotTiket(data);
  };

  useEffect(() => {
    if (
      (current_user.userId == null || current_user.role != "PROMOTOR") &&
      status == "succeeded"
    ) {
      navigate("/", { replace: true });
    }
  }, []);
  if (
    (current_user.userId == null || current_user.role != "PROMOTOR") &&
    status == "succeeded"
  ) {
    navigate("/", { replace: true });
  }

  async function submitForm(e) {
    e.preventDefault();
    if (
      nama == null ||
      surat == null ||
      address == null ||
      venue == null ||
      tanggal == null ||
      deskripsi == null ||
      kategori == null ||
      informasiKategori == null ||
      kota == null ||
      syaratKetentuan == false ||
      poster == null ||
      banner == null
    ) {
      setErrorMessage("Inputan ada yang kosong");
      return;
    }

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("surat", surat);
    formData.append("venue", venue);
    formData.append("address", address);
    formData.append("tanggal", tanggal);
    formData.append("kota", kota);
    formData.append("deskripsi", deskripsi);
    formData.append("kategori", JSON.stringify(kategori));
    formData.append("informasiKategori", informasiKategori);
    formData.append("syaratKetentuan", syaratKetentuan);
    formData.append("poster", poster);
    formData.append("banner", banner);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let retu = await createEvent(formData, config);
    if (retu) {
      navigate(0);
    }
  }

  const handleBanner = (file) => {
    console.log(file);
    if (file.type != "image/jpeg") {
      setErrorMessageMulter("Banner harus berupa image");
      return;
    }
    setBanner(file);
  };

  const handlePoster = (file) => {
    console.log(file);
    if (file.type != "image/jpeg") {
      setErrorMessageMulter("Poster harus berupa image");
      return;
    }
    setPoster(file);
  };

  const handleSurat = (file) => {
    console.log(file);
    if (file.type != "image/jpeg") {
      setErrorMessageMulter("Surat harus berupa image");
      return;
    }
    setSurat(file);
  };

  const handleInformasiKategori = (file) => {
    console.log(file);
    if (file.type != "image/jpeg") {
      setErrorMessageMulter("informasi kategori harus berupa image");
      return;
    }
    setInformasiKategori(file);
  };

  const handleCheckboxChange = () => {
    setSyaratKetentuan(!syaratKetentuan);
  };

  function tambahKategori() {
    const temp = {
      namaKategori: kategoriTiket,
      hargaTiket: hargaTiket,
      slotTiket: slotTiket,
    };

    setKategoriTiket("");
    setHargaTiket("");
    setSlotTiket("");
    setKategori([...kategori, temp]);
  }
  return (
    <>
      <form className="pb-24" onSubmit={submitForm}>
        <div>
          <div className="flex px-12 w-full">
            <div className="biruTua p-10 my-10 rounded w-3/12">
              <div className="text-center text-white">
                <div className="flex justify-center my-2 items-center">
                  <img src={upload} alt="" className="w-10 invert" />
                </div>
                <p>Unggah Poster</p>
                <p className="text-xs">
                  Direkomendasikan 595 x 842 px dan tidak lebih dari 30 MB
                </p>
                <div className="flex w-full justify-center bg-gray-900 my-2">
                  <input
                    type="file"
                    name=""
                    id=""
                    className="font-sm"
                    onChange={(e) => {
                      handlePoster(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="biruTua p-10 my-10 rounded ml-12 w-9/12 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="flex justify-center items-center my-2">
                  <img src={upload} alt="" className="w-10 invert" />
                </div>
                <p>Unggah Banner</p>
                <p className="font-xs">
                  Direkomendasikan 595 x 842 px dan tidak lebih dari 30 MB
                </p>
                <div className="flex ml-48 w-5/12 bg-gray-900 my-2">
                  <input
                    type="file"
                    name=""
                    id=""
                    className=""
                    onChange={(e) => {
                      handleBanner(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="px-10">
            <div className="biruTua p-10 mb-10 rounded w-full text-white">
              <p>Nama Event</p>
              <input
                className="w-full px-2 py-2 abuInput outline-none mb-2 rounded"
                type="text"
                placeholder="Masukkan nama event"
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
              <p>Venue</p>
              <input
                className="w-full px-2 py-2 abuInput outline-none mb-2 rounded"
                type="text"
                placeholder="Masukkan venue"
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
              />
              <p>Address</p>
              <input
                className="w-full px-2 py-2 abuInput outline-none mb-2 rounded"
                type="text"
                placeholder="Masukkan Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <p>Tanggal Event</p>
              <input
                className="w-full px-2 py-2 abuInput outline-none mb-2 rounded"
                type="date"
                onChange={(e) => {
                  setTanggal(e.target.value);
                }}
              />
              <p>Unggah Surat Verifikasi Event</p>
              <input
                className="px-2 py-2 mb-2"
                type="file"
                onChange={(e) => {
                  handleSurat(e.target.files[0]);
                }}
              />
              <p>Deskripsi Event</p>
              <textarea
                className="w-full md:w-full p-2 border resize-y abuInput outline-none mb-2 rounded"
                placeholder="Massukkan deskripsi event"
                onChange={(e) => {
                  setDeskripsi(e.target.value);
                }}
              ></textarea>
              <label htmlFor="city" className="sr-only">
                Pilih Kota
              </label>
              <select
                id="city"
                defaultValue={""}
                autoFocus
                className="border text-sm rounded border-s-2 focus:border-blue-500 block w-full p-2.5 biruTua border-gray-600 placeholder-gray-400 text-[#f8f8f8] focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                  setKota(e.target.value);
                }}
              >
                <option value="">Pilih Kota</option>
                {kotaDanKabupaten.map((k, index) => (
                  <option key={index} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <p>Kategori Tiket</p>
              {kategori.length > 0 && (
                <div>
                  {kategori.map((k, index) => {
                    return (
                      <div
                        key={index}
                        className="flex text-white w-full gap-2 mt-5"
                      >
                        <input
                          type="text"
                          className="w-4/12 px-2 py-2 abuInput outline-none rounded"
                          value={k.namaKategori}
                          disabled
                        />
                        <input
                          type="text"
                          className="w-4/12 px-2 py-2 abuInput outline-none rounded"
                          value={k.hargaTiket}
                          disabled
                        />
                        <input
                          type="text"
                          className="w-4/12 px-2 py-2 abuInput outline-none rounded"
                          value={k.slotTiket}
                          disabled
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              {boolAddKategori && (
                <CardKategoriTiketEvent
                  handleKategoriTicket={handleKategoriTicket}
                  kategoriTiket={kategoriTiket}
                  hargaTiket={hargaTiket}
                  slotTiket={slotTiket}
                  handleHargaTicket={handleHargaTicket}
                  handleSlotTicket={handleSlotTicket}
                ></CardKategoriTiketEvent>
              )}
              <div
                className="cursor-pointer text-center w-full px-2 py-2 biruMuda outline-none mr-2 rounded mb-2"
                onClick={() => {
                  tambahKategori();
                }}
              >
                Tambah Kategori
              </div>
              <p>Unggah Informasi Kategori/Zona</p>
              <input
                className="px-2 py-2 mb-2 mb-2"
                type="file"
                onChange={(e) => {
                  handleInformasiKategori(e.target.files[0]);
                }}
              />
              <div className="flex mb-2">
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={syaratKetentuan}
                  onChange={handleCheckboxChange}
                />{" "}
                Saya setuju dengan
                <p className="text-blue-400 ml-2">
                  {" "}
                  Kebijakan privasi Magneticket
                </p>
              </div>
              {errorMessage != null && (
                <span className="text-red-500">{errorMessage}</span>
              )}
              {errorMessageMulter != null && (
                <span className="text-red-500">{errorMessageMulter}</span>
              )}
              <button className="biruMuda w-full py-2 rounded">
                Buat Jadwal Konser
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
