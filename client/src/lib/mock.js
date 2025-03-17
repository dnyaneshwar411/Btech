export async function getClients(query = "") {
  try {
    const response = await fetch("/mock/clients.json")
    const data = await response
      .json()
    return {
      success: true,
      data: data
        .filter(item =>
          item.name.includes(query)
        )
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal Server Error!"
    }
  }
}

export async function getJobs(query = "") {
  try {
    const response = await fetch("/mock/jobs.json")
    const data = await response
      .json()
    return {
      success: true,
      data: data
        .filter(item =>
          item.job_id.includes(query) ||
          item.requested_by.name.includes(query)
        )
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal Server Error!"
    }
  }
}

export async function getJobsDetails(query) {
  try {
    const response = await fetch("/mock/jobs.json")
    const data = await response
      .json()
    return {
      success: true,
      data: data
        .find(item => item.job_id === query)
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal Server Error!"
    }
  }
}

export async function getInvoice(query) {
  try {
    const response = await fetch("/mock/invoice.json")
    const data = await response
      .json()
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal Server Error!"
    }
  }
}