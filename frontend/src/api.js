import axios from "axios"

//tablet

export const addTablet = async (file, tabletData) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productname", tabletData.productname);
      formData.append("productcategorey", tabletData.productcategorey);
      formData.append("dateofmfc", tabletData.dateofmfc);
      formData.append("dateofexp", tabletData.dateofexp);
      formData.append("price", tabletData.price);
      formData.append("stock", tabletData.stock);


  
      const result = await axios.post('http://localhost:6050/api/v1/tablet/addtablet', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      return result.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      return { success: false, error: error.message };
    }
  };
  export const getTablet = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:6050/api/v1/tablet/gettablet");
      console.log("API Response:", response.data);
  
      // ✅ Directly return the array instead of response.data.tablets
      return response.data || []; 
    } catch (error) {
      console.error("Error fetching tablets:", error);
      return [];
    }
  };

  export const updateTablet = async (file, tabletData, id) => {
    try {
      console.log("ids",id);
      
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productname", tabletData.productname);
      formData.append("productcategorey", tabletData.productcategorey);
      formData.append("dateofmfc", tabletData.dateofmfc);
      formData.append("dateofexp", tabletData.dateofexp);
      formData.append("price", tabletData.price);
      formData.append("stock", tabletData.stock);
  //http://127.0.0.1:6050/api/v1/tablet/changetablet/67dcc7d6d22471a292fc3889

      const result = await axios.put(`http://localhost:6050/api/v1/tablet/changetablet/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      return result.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      return { success: false, error: error.message };
    }
  };
  
  

  export const deletetTablet = async (id) => {
    try {
      console.log("id for delete api",id);
      
      const response = await axios.delete(`http://127.0.0.1:6050/api/v1/tablet/deletetablet/${id}`);
      console.log("API Response:", response);
  
      console.log(response);
      
    } catch (error) {
      console.error("Error fetching tablets:", error);
      return [];
    }
  };
 
//oilment  
export const addOinment = async (file, tabletData) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tabletname", tabletData.tabletname);
    formData.append("productcategorey", tabletData.productcategorey);
    formData.append("dateofmfc", tabletData.dateofmfc);
    formData.append("dateofexp", tabletData.dateofexp);
    formData.append("price", tabletData.price);
    formData.append("stock", tabletData.stock);



    const result = await axios.post('http://localhost:6050/api/v1/oinment/addtoinment', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message };
  }
};


export const getOinment = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:6050/api/v1/oinment/getoinment");
    console.log("API Response oinment:", response.data);

    // Return the entire response data array
    return response.data || [];
  } catch (error) {
    console.error("Error fetching ointments:", error);
    return [];
  }
};

export const updateOinment = async (file, tabletData,id) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productname", tabletData.productname);
    formData.append("productcategorey", tabletData.productcategorey);
    formData.append("dateofmfc", tabletData.dateofmfc);
    formData.append("dateofexp", tabletData.dateofexp);
    formData.append("price", tabletData.price);
    formData.append("stock", tabletData.stock);



    const result = await axios.put(`http://localhost:6050/api/v1/oinment/changeoinment/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message };
  }
};


export const deletetOinment = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:6050/api/v1/oinment/deleteoinment/${id}`);
    console.log("API Response:", response);

    // ✅ Directly return the array instead of response.data.tablets
    console.log(response);
    
  } catch (error) {
    console.error("Error fetching tablets:", error);
    return [];
  }
};


//syrup


export const addSyrup = async (file, tabletData) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tabletname", tabletData.tabletname);
    formData.append("productcategorey", tabletData.productcategorey);
    formData.append("dateofmfc", tabletData.dateofmfc);
    formData.append("dateofexp", tabletData.dateofexp);
    formData.append("price", tabletData.price);
    formData.append("stock", tabletData.stock);



    const result = await axios.post('http://localhost:6050/api/v1/syrup/addsyrup', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message };
  }
};



export const getSyrup = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:6050/api/v1/syrup/getsyrup");
    console.log("API Response:", response.data);

    // Return the correct response format
    return response.data; // Since API response is already an array
  } catch (error) {
    console.error("Error fetching syrup:", error);
    return [];
  }
};

export const updateSyrup = async (file, tabletData,id) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productname", tabletData.productname);
    formData.append("productcategorey", tabletData.productcategorey);
    formData.append("dateofmfc", tabletData.dateofmfc);
    formData.append("dateofexp", tabletData.dateofexp);
    formData.append("price", tabletData.price);
    formData.append("stock", tabletData.stock);



    const result = await axios.put(`http://localhost:6050/api/v1/syrup/changesyrup/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message };
  }
};


export const deletetSyrup = async (id) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:6050/api/v1/syrup/deletesyrup/${id}`);
    console.log("API Response:", response);

    // ✅ Directly return the array instead of response.data.tablets
    console.log(response);
    
  } catch (error) {
    console.error("Error fetching tablets:", error);
    return [];
  }
};





//Billing section
export const createBill = async (billData) => {
  try {
    const response = await fetch("http://localhost:6050/api/v1/billing/createbill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billData),
    });
    return response.json();
  } catch (error) {
    console.error("Error saving bill:", error);
  }
};
