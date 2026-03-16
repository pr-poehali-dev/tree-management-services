import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту владельца."""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        phone = body.get("phone", "").strip()
        service = body.get("service", "").strip()
        comment = body.get("comment", "").strip()

        if not name or not phone:
            return {
                "statusCode": 400,
                "headers": cors_headers,
                "body": {"error": "name and phone required"},
            }

        smtp_host = os.environ.get("SMTP_HOST", "smtp.mail.ru")
        smtp_port = int(os.environ.get("SMTP_PORT", "465"))
        smtp_user = os.environ["SMTP_USER"]
        smtp_password = os.environ["SMTP_PASSWORD"]
        to_email = os.environ.get("TO_EMAIL", smtp_user)

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Новая заявка с сайта — {name}"
        msg["From"] = smtp_user
        msg["To"] = to_email

        html = f"""
        <html><body style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a2e1a; padding: 24px; border-radius: 12px 12px 0 0;">
            <h2 style="color: #ffffff; margin: 0; font-size: 22px;">🌲 Новая заявка с сайта ЛесМастер</h2>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #e0e0e0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666; width: 140px;">Имя</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">{name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Телефон</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">
                    <a href="tel:{phone}" style="color: #2d6a2d;">{phone}</a></td></tr>
              {'<tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Услуга</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">' + service + '</td></tr>' if service else ''}
              {'<tr><td style="padding: 10px 0; color: #666; vertical-align: top;">Комментарий</td><td style="padding: 10px 0;">' + comment + '</td></tr>' if comment else ''}
            </table>
            <div style="margin-top: 20px; padding: 12px 16px; background: #e8f5e9; border-radius: 8px; font-size: 13px; color: #555;">
              Заявка получена автоматически с сайта ЛесМастер
            </div>
          </div>
        </body></html>
        """

        msg.attach(MIMEText(html, "html", "utf-8"))

        with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, to_email, msg.as_string())

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": {"success": True, "message": "ok"},
        }

    except KeyError as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": {"error": f"secret missing: {str(e)}"},
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": {"error": str(e)},
        }
