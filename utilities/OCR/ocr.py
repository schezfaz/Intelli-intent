import requests
import sys

subscription_key = "cad74b1af7154750ad94d3189ee3cc05"
vision_base_url = "https://basched.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&details={string}&language=en"
ocr_url = vision_base_url + "ocr"

def image_to_text(image_file, output_file):
    image_data = open(image_file, "rb").read()
    headers = {'Ocp-Apim-Subscription-Key': subscription_key,
               'Content-Type': 'application/octet-stream'}
    response = requests.post(ocr_url, headers=headers, data=image_data)
    response.raise_for_status()
    analysis = response.json()

    regions = analysis["regions"]
    lines = [region["lines"] for region in regions][0]
    words = [line["words"] for line in lines]
    lines_words = []
    for line_words in words:
        w = [lw["text"] for lw in line_words]
        lines_words.append(w)

    with open(output_file, "w+") as output:
        for lw in lines_words:
            output.write(' '.join(lw))
            output.write('\n')

def ocr_text(image_file):
    image_to_text(image_file, image_file.replace(".jpg", ".txt"))

if __name__ == "__main__":
    ocr_text("ocr_text.jpg")