<?php 
// Include the database configuration file  
require_once 'db_connection.php'; 
for($i=0;$i<20;$i++){
    if(isset($_FILES["file-".$i])){
        $filename = $_FILES["file-".$i]["name"];
        $tempname = $_FILES["file-".$i]["tmp_name"];
        $folder = "./uploads/" . $filename;
        $delay = $_POST["delayInput-0"];
        // Get all the submitted data from the form

        $insert = $db->query("INSERT INTO menu_builder_data (user_id,slider_image_urls,slider_image_delays) VALUES (3,'$folder','$delay')");

        // Now let's move the uploaded image into the folder: image
        if (move_uploaded_file($tempname, $folder) && $insert) {
            echo "<h3>  Image uploaded successfully!</h3>";
        } else {
            echo "<h3>  Failed to upload image!</h3>";
        }
    }
}

?>