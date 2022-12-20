noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;
text_of_user = "";

function setup()
{
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 500);
    canvas.position(560, 150);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function draw()
{
    background('#00004d');
    fill("#ffd9b3");
    textSize(difference);
    text(text_of_user, noseX, noseY);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " + noseX + " noseY = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rigthtWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rigthtWristX);
        console.log("leftWristX = " + leftWristX + " rigthtWristX = " + rigthtWristX + " difference = " + difference);

        text_of_user = document.getElementById("user_text").value;
        console.log("Text = " + text_of_user);

        document.getElementById("square sides").innerHTML = "Font size of the text will be = " + difference + "px"; 
    }
}