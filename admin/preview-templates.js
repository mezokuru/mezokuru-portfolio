// Custom preview template for invoices
CMS.registerPreviewTemplate('invoices', ({ entry }) => {
  const data = entry.get('data').toJS();
  
  return `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; background: #f5f5f5;">
      <div style="max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="border-bottom: 3px solid #ffd166; padding-bottom: 20px; margin-bottom: 20px;">
          <h1 style="color: #2c3e50; margin: 0;">MEZOKURU</h1>
          <p style="color: #ffd166; font-style: italic; margin: 5px 0;">Clean code. Real growth.</p>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div>
            <h3 style="color: #2c3e50; border-bottom: 2px solid #ffd166; padding-bottom: 5px;">Invoice Details</h3>
            <p><strong>Invoice #:</strong> ${data.invoice_number}</p>
            <p><strong>Date:</strong> ${new Date(data.date).toLocaleDateString()}</p>
            <p><strong>Due Date:</strong> ${new Date(data.due_date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> <span style="background: #3498db; color: white; padding: 3px 10px; border-radius: 15px; font-size: 0.9em;">${data.status.toUpperCase()}</span></p>
          </div>
          
          <div>
            <h3 style="color: #2c3e50; border-bottom: 2px solid #ffd166; padding-bottom: 5px;">Bill To</h3>
            <p><strong>${data.client}</strong></p>
          </div>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="color: #2c3e50; margin-top: 0;">Description</h3>
          <p style="white-space: pre-wrap;">${data.description}</p>
        </div>
        
        <div style="text-align: right; background: #2c3e50; color: white; padding: 15px; border-radius: 5px;">
          <h2 style="margin: 0;">Total: R ${parseFloat(data.amount).toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</h2>
        </div>
        
        ${data.notes ? `
          <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border-left: 3px solid #ffd166; border-radius: 3px;">
            <h4 style="margin: 0 0 10px 0; color: #2c3e50;">Notes</h4>
            <p style="margin: 0; white-space: pre-wrap;">${data.notes}</p>
          </div>
        ` : ''}
        
        <div style="margin-top: 30px; text-align: center; padding-top: 20px; border-top: 2px solid #e0e0e0; color: #666; font-size: 0.9em;">
          <p><strong>Thank you for your business!</strong></p>
          <p>mezokuru@gmail.com | mezokuru.xyz</p>
        </div>
      </div>
    </div>
  `;
});
