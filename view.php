<?php 
// Include the database configuration file  
require_once 'db_connection.php'; 
 
// Get image data from database 
$result = $db->query("SELECT slider_image_urls, slider_image_delays FROM menu_builder_data ORDER BY id DESC"); 
?>

<?php if($result->num_rows > 0){ ?> 
    <div class="gallery"> 
        <?php while($row = $result->fetch_assoc()){ ?> 
            <img style="width:35%;" src="<?php echo $row['slider_image_urls']; ?>" />
            delay: <?php echo $row['slider_image_delays']; ?> sec
        <?php } ?> 
    </div> 
<?php }else{ ?> 
    <p class="status error">Image(s) not found...</p> 
<?php } ?>