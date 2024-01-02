const apiKey = 'f88fccc6204c03bf05fda50c698282e5'; // Ganti dengan API key yang sesuai
const code = '00001'; // Ganti dengan API key yang sesuai

const endpointEntitas = "/api/entitas";
const endpointTransaksi = "/api/transaksi-keuangan";
const endpointJenisTransaksi = "/api/jenis-transaksi";
const endpointAkunKeuangan = "/api/akun-keuangan";

const tipeTransaksiOptions = [
  { value: "", text: "Pilih Tipe Transaksi", selected: true, disabled: true },
  { value: "debit", text: "Debit" },
  { value: "kredit", text: "Kredit" },
];


// Fungsi untuk mengambil teks berdasarkan nilai (value)
function getTipeTransaksiText(value) {
  const option = tipeTransaksiOptions.find(option => option.value === value);
  return option ? option.text : null;
}


function getCodeClientByApiKey(apiKey){
  // Fetch client data from the endpoint and populate the form
  fetch(`http://localhost:3000/api/client/${code}`) // Replace 'your_package_id' with the actual package ID
      .then(response => response.json())
      .then(data => {
          if (data.success && data.count > 0) {
              const clientData = data.data[0];
          } else {
              console.error('Failed to fetch client data:', data.message || 'Unknown error');
              // Handle failure to fetch data
          }
      })
      .catch(error => {
          console.error('Error fetching client data:', error);
          // Handle errors, e.g., show a general error message
      });

      return clientData;
}


function populateTipeTransaksiDropdown() {
  const dropdown = document.getElementById("tipe_transaksi");

  // Bersihkan opsi yang ada
  dropdown.innerHTML = "";

  // Tambahkan opsi baru dari array
  tipeTransaksiOptions.forEach(option => {
    const newOption = document.createElement("option");
    newOption.value = option.value;
    newOption.text = option.text;
    newOption.selected = option.selected || false;
    newOption.disabled = option.disabled || false;
    dropdown.appendChild(newOption);
  });
}


function formatDate(dateString) {
  if (dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  } else {
    return '-';
  }
}

function getFamilyInfo(member) {
  if (member) {
    return `${member.nama ? member.nama : '-'}`;
  } else {
    return '-';
  }
}

// Function to initialize DataTable
function initializeDataTable(selector, options, buttonContainer) {
    // Destroy existing DataTable if it exists
    if ($.fn.DataTable.isDataTable(selector)) {
        //$(selector).DataTable().destroy();
    }

    // Reinitialize DataTable
    let dataTable = $(selector).DataTable(options);

    if (buttonContainer) {
        dataTable.buttons().container().appendTo(buttonContainer);
    }

    return dataTable;
}

function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    return formatter.format(number);
}
