# Google Ads Disapproved Extensions Monitor

This Google Ads script monitors your MCC account for disapproved ad extensions. It checks both account-level and campaign-level extensions and sends an email report when it finds disapproved extensions.

## Features

- Monitors accounts with the label "TB_Script"
- Checks for disapproved extensions at both account and campaign levels
- Supports multiple extension types:
  - Sitelinks
  - Callouts
  - Call extensions
  - Structured snippets
  - Price extensions
  - Promotion extensions
- Sends detailed email reports with disapproval information

## Setup Instructions

1. In your Google Ads MCC account, create a new script
2. Copy the contents of `checkDisapprovedExtensions.js` into the script editor
3. Update the `recipientEmail` variable in the `sendEmailReport` function with your email address
4. Add the label "TB_Script" to all accounts you want to monitor
5. Save and authorize the script
6. Schedule the script to run at your preferred frequency (daily recommended)

## Email Report Format

The email report includes:
- Account name and ID
- Campaign name (for campaign-level extensions)
- Asset type and name
- Approval status and review status

## Requirements

- MCC-level access to Google Ads
- Appropriate Google Ads API access
- Account label "TB_Script" applied to monitored accounts

## Customization

You can customize the script by:
1. Modifying the extension types to monitor in the GAQL queries
2. Adjusting the email report format in the `formatEmailBody` function
3. Adding additional fields to the GAQL queries for more detailed reporting
4. Implementing custom filtering logic in the main processing functions

## Error Handling

The script includes basic error handling for:
- Account access issues
- GAQL query execution
- Email sending failures

If errors occur, they will be logged in the Google Ads Scripts console.

## Best Practices

1. Regular Monitoring
   - Schedule the script to run daily to catch disapprovals quickly
   - Review email reports promptly to address issues

2. Account Organization
   - Use consistent labeling across accounts
   - Keep the "TB_Script" label updated as accounts are added or removed

3. Maintenance
   - Regularly verify email recipients are current
   - Check for any changes in Google Ads API that might affect the GAQL queries
   - Update extension type list as new extension types are released

## Troubleshooting

### Common Issues

1. Script not running
   - Verify script authorization
   - Check account access permissions
   - Confirm script scheduling is enabled

2. Missing data
   - Verify account labels are correct
   - Check GAQL query syntax
   - Ensure all relevant extension types are included

3. Email issues
   - Verify email address format
   - Check spam folders
   - Confirm MailApp authorization

### Debug Tips

- Use `Logger.log()` statements to debug specific sections
- Enable preview mode to test without sending emails
- Check the script execution logs for error messages

## Contributing

Contributions to improve the script are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description of changes

## License

This script is released under the MIT License. See the LICENSE file for details.

## Version History

- 1.0.0 (2024-12-09)
  - Initial release
  - Basic disapproved extension monitoring
  - Email reporting functionality

## Support

For issues and feature requests, please:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

## Acknowledgments

- Google Ads API documentation
- Google Ads Scripts reference
- Community contributors and testers