
(function() {
  module.exports.mail = {
    templete: {
      greeting: {
        sendBy: 'email',
        subject: '【%(storeName)s】會員註冊完成通知信',
        html: "<html><body>\n<br />親愛的 %(fullName)s 您好：\n<br />\n<br />感謝您註冊成為我們的會員！您的會員帳號：%(userEmail)s\n<br />\n<br />\n<br />1.當您忘記帳號密碼時，請直接於會員登入頁面點選<span stype='color:blue'>忘記密碼</span>，系統將立即為您服務。\n<br />2.如您有任何購買及會員問題，請於網頁最下方的【 聯絡客服 】留言詢問，客服人員將以最快的速度協助處理您的需求。\n<br />3.請於購物前詳閱站內FAQ購物流程說明及使用條款、隱私權政策、免責聲明，感謝您的配合。\n<br />\n<br />此為系統信件，請勿直接回覆此信件\n<br />\n<br />---\n<br />\n<br />%(storeName)s客服中心\n<br />\n<br />客服信箱：<a href='%(serviceMail)s'>%(serviceMail)s</a>\n<br />上班時間：週一至週五，9.00AM – 6.00PM，比照國定休假日\n</body></html>"
      },
      checkForgot: {
        sendBy: 'email',
        subject: '【%(storeName)s】忘記密碼確認信',
        html: "<html><body>\n<br />親愛的 %(fullName)s 您好：\n<br />\n<br />您在我們的系統中忘記密碼了嗎？\n<br />若您忘記了密碼，請點選以下連結，系統將會幫您重置密碼並寄到您的信箱\n<br />\n<br /><a href='%(link)s'>Click Me</a>\n<br />\n<br />如果這不是您本人，您可以選擇忽略此封郵件。\n<br />\n<br />此為系統信件，請勿直接回覆此信件\n<br />\n<br />---\n<br />\n<br />%(storeName)s客服中心\n<br />\n<br />客服信箱：<a href='%(serviceMail)s'>%(serviceMail)s</a>\n<br />上班時間：週一至週五，9.00AM – 6.00PM，比照國定休假日\n</body></html>"
      },
      newPassword: {
        sendBy: 'email',
        subject: '【%(storeName)s】密碼重設確認信',
        html: "\"<html><body>\n<br />親愛的 %(fullName)s 您好：\n<br />\n<br />您在%(createdAt)s詢問用戶密碼，請確認下方用戶密碼並妥保存，謝謝。\n<br />\n<br />會員帳號：%(userId)s\n<br />\n<br />新密碼為：<p style=\"color:red\">%(password)s</p><br><br>\n<br />\n<br />此為系統信件，請勿直接回覆此信件\n<br />\n<br />---\n<br />\n<br />%(storeName)s客服中心\n<br />\n<br />客服信箱：<a href='%(serviceMail)s'>%(serviceMail)s</a>\n<br />上班時間：週一至週五，9.00AM – 6.00PM，比照國定休假日\n</body></html>"
      },
      verification: {
        sendBy: 'email',
        subject: '【%(storeName)s】Signup notification',
        html: "<html><body>Dear %(fullName)s,<br/><br/><p>Welcome to GITA!</p>Your registration was successful but you still need to wait the Node (%(nodeName)s) to verify your application.<br/><br/><br/>If you have any questions, please feel free to contact %(nodeName)s.<br/><br/><br/>To keep in touch with GITA, please visit our official website at <a href='https://gita.foundation' target='_blank'>https://gita.foundation.</a><br/><br/><br/>Cheers,<br/>GITA Foundation.<br/></body></html>"
      },
      userUpdate: {
        sendBy: 'email',
        subject: '%(fullName)s - 會員資料修改通知信',
        html: "<html><body>\n<br />親愛的 %(fullName)s 您好：\n<br />\n<br />您在 %(createdAt)s 於 %(storeName2)s 會員中心修改會員資料。\n<br />如您最近沒有修改任何會員資料，請聯絡我們並更換密碼。\n<br />\n<br />會員帳號：%(userId)s\n<br />\n<br />此為系統信件，請勿直接回覆此信件\n<br />\n<br />---\n<br />\n<br />%(storeName)s客服中心\n<br />\n<br />客服信箱：<a href='%(serviceMail)s'>%(serviceMail)s</a>\n<br />\n<br />上班時間：週一至週五，9.00AM – 6.00PM，比照國定休假日\n</body></html>"
      },
      contactUs: {
        sendBy: 'email',
        subject: '%(userName)s 聯繫 %(storeName)s',
        html: "<html><body>\n<br /><p> %(userName)s 聯繫 %(storeName)s ！</p>\n<br />\n<br />信件內容：\n<br /><p> 你的大名：%(userName)s </p>\n<br /><p> 你的 Email：%(userId)s </p>\n<br /><p> 你的聯絡方式：%(userContact)s </p>\n<br /><p> 你的問題類型：%(userIssue)s </p>\n<br /><p> 你的問題：%(userQuestion)s </p>\n<br />\n<br />此為系統信件，請勿直接回覆此信件\n<br />\n<br />---\n<br />\n<br />%(storeName)s客服中心\n<br />\n<br />客服信箱：<a href='%(serviceMail)s'>%(serviceMail)s</a>\n<br />\n<br />上班時間：週一至週五，9.00AM – 6.00PM，比照國定休假日\n</body></html>"
      },
      requestMentionedPersonToVerified: {
        sendBy: 'email',
        subject: '【Gita Confirmation Letter】%(memberName)s mention you in a project',
        html: "<html><body><p>Dear %(personName)s</p>%(memberName)s(%(memberEmail)s) has mentioned %(personName)s(%(personEmail)s) are a(an) <b>%(roleType)s</b> in this project:：\n<br />\n<br />Project's name: %(projectName)s\n<br />Project's token ticker: %(token)s\n<br />Project website: %(website)s\n<br />More information: %(projectUrl)s\n<br /><br />Click the link to confirm project info about yours.\n<br />%(activeLink)s\n<br />\n<br />\n<br />Note: This confirmation was intended for %(personEmail)s. If you were not expecting this confirmation, you can ignore this email.\n<br />\n<br />\n<br />----\n<br />GITA - Global ICO Transparency Alliance\n</body></html>",
      }
    }
  };

}).call(this);
