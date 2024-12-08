/**
 * Google Ads Script to check for disapproved ad extensions at MCC level
 * Only checks accounts with label "TB_Script"
 * Version: 1.0
 */

function main() {
  // Initialize arrays to store results
  const disapprovedExtensions = [];
  
  // Get all accounts with the specified label
  const accountSelector = AdsManagerApp.accounts()
    .withCondition("LabelNames CONTAINS 'TB_Script'");
  
  const accountIterator = accountSelector.get();
  
  // Iterate through each account
  while (accountIterator.hasNext()) {
    const account = accountIterator.next();
    AdsManagerApp.select(account);
    
    // Check for disapproved extensions at account level
    checkCustomerAssets(account, disapprovedExtensions);
    
    // Check for disapproved extensions at campaign level
    checkCampaignAssets(account, disapprovedExtensions);
  }
  
  // Send email if there are disapproved extensions
  if (disapprovedExtensions.length > 0) {
    sendEmailReport(disapprovedExtensions);
  }
}

function checkCustomerAssets(account, results) {
  const query = `
    SELECT 
      customer.descriptive_name,
      asset.id,
      asset.type,
      asset.name,
      asset.status,
      asset.policy_summary.approval_status,
      asset.policy_summary.review_status
    FROM customer_asset
    WHERE 
      asset.policy_summary.approval_status = 'DISAPPROVED'
      AND asset.type IN ('SITELINK', 'CALLOUT', 'CALL', 'STRUCTURED_SNIPPET', 'PRICE', 'PROMOTION')
  `;
  
  const report = AdsApp.report(query);
  const rows = report.rows();
  
  while (rows.hasNext()) {
    const row = rows.next();
    results.push({
      accountName: account.getName(),
      accountId: account.getCustomerId(),
      assetId: row['asset.id'],
      assetType: row['asset.type'],
      assetName: row['asset.name'],
      approvalStatus: row['asset.policy_summary.approval_status'],
      reviewStatus: row['asset.policy_summary.review_status']
    });
  }
}

function checkCampaignAssets(account, results) {
  const query = `
    SELECT 
      customer.descriptive_name,
      campaign.name,
      asset.id,
      asset.type,
      asset.name,
      asset.status,
      asset.policy_summary.approval_status,
      asset.policy_summary.review_status
    FROM campaign_asset
    WHERE 
      asset.policy_summary.approval_status = 'DISAPPROVED'
      AND asset.type IN ('SITELINK', 'CALLOUT', 'CALL', 'STRUCTURED_SNIPPET', 'PRICE', 'PROMOTION')
  `;
  
  const report = AdsApp.report(query);
  const rows = report.rows();
  
  while (rows.hasNext()) {
    const row = rows.next();
    results.push({
      accountName: account.getName(),
      accountId: account.getCustomerId(),
      campaignName: row['campaign.name'],
      assetId: row['asset.id'],
      assetType: row['asset.type'],
      assetName: row['asset.name'],
      approvalStatus: row['asset.policy_summary.approval_status'],
      reviewStatus: row['asset.policy_summary.review_status']
    });
  }
}

function sendEmailReport(disapprovedExtensions) {
  const emailBody = formatEmailBody(disapprovedExtensions);
  const recipientEmail = 'your-email@example.com'; // Replace with actual email
  
  MailApp.sendEmail({
    to: recipientEmail,
    subject: 'Google Ads - Disapproved Extensions Report',
    htmlBody: emailBody
  });
}

function formatEmailBody(disapprovedExtensions) {
  let html = '<h2>Disapproved Extensions Report</h2>';
  html += '<p>The following extensions have been disapproved:</p>';
  html += '<table border="1" cellpadding="5" style="border-collapse: collapse;">';
  html += '<tr><th>Account</th><th>Campaign</th><th>Asset Type</th><th>Asset Name</th><th>Status</th><th>Review Status</th></tr>';
  
  disapprovedExtensions.forEach(item => {
    html += '<tr>';
    html += `<td>${item.accountName} (${item.accountId})</td>`;
    html += `<td>${item.campaignName || 'Account Level'}</td>`;
    html += `<td>${item.assetType}</td>`;
    html += `<td>${item.assetName}</td>`;
    html += `<td>${item.approvalStatus}</td>`;
    html += `<td>${item.reviewStatus}</td>`;
    html += '</tr>';
  });
  
  html += '</table>';
  html += '<p>Please review these extensions and make necessary adjustments.</p>';
  return html;
}
