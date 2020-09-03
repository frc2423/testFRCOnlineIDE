/*----------------------------------------------------------------------------*/
/* Copyright (c) 2017-2020 FIRST. All Rights Reserved.                        */
/* Open Source Software - may be modified and shared by FRC teams. The code   */
/* must be accompanied by the FIRST BSD license file in the root directory of */
/* the project.                                                               */
/*----------------------------------------------------------------------------*/

package frc.robot;

import edu.wpi.first.wpilibj.TimedRobot;
import edu.wpi.first.wpilibj.Timer;
import edu.wpi.first.wpilibj.PWMVictorSPX;
import edu.wpi.first.wpilibj.drive.DifferentialDrive;
import edu.wpi.first.wpilibj.XboxController;
import frc.lib.Calibration.CalWrangler;
import frc.lib.DataServer.CasseroleDataServer;
import frc.lib.DataServer.Signal;
import frc.lib.LoadMon.CasseroleRIOLoadMonitor;
import frc.lib.WebServer.CasseroleWebServer;

import java.io.IOException;


/**
 * The VM is configured to automatically run this class, and to call the
 * functions corresponding to each mode, as described in the TimedRobot
 * documentation. If you change the name of this class or the package after
 * creating this project, you must also update the build.gradle file in the
 * project.
 */
public class Robot extends TimedRobot {

    // Website utilities
    CasseroleWebServer webserver;
    CalWrangler wrangler;
    CasseroleDataServer dataServer;
    LoopTiming loopTiming;
    CasseroleRIOLoadMonitor loadMon;

    Signal teleopInitCounterSig;
    int teleopInitCounter = 0;

    PWMVictorSPX motor1;
    PWMVictorSPX motor2;
    DifferentialDrive drive;
    XboxController controller;

    /**
     * This function is run when the robot is first started up and should be used
     * for any initialization code.
     */
    @Override
    public void robotInit() {

        /* Init website utilties */
        webserver = new CasseroleWebServer();
        wrangler = new CalWrangler();
        dataServer = CasseroleDataServer.getInstance();
        loadMon = new CasseroleRIOLoadMonitor();

        teleopInitCounterSig = new Signal("Teleop Init Count", "count");

        dataServer.startServer();
        webserver.startServer();

        try {
            Runtime.getRuntime().exec("firefox localhost:5805");
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }


        System.out.println("Robot Init completed!");

        motor1 = new PWMVictorSPX(0);
        motor2 = new PWMVictorSPX(0);

        drive = new DifferentialDrive(motor1, motor2);
        controller = new XboxController(0);
    }

    @Override
    public void robotPeriodic() {
        // System.out.println("Robot periodic.....!!!!!?????");
    }


  @Override
  public void autonomousInit() {

  }

  /**
   * This function is called periodically during autonomous.
   */
  @Override
  public void autonomousPeriodic() {
      System.out.println("auto periodic....");
      telemetryUpdate();
  }

  /**
   * This function is called once when teleop is enabled.
   */
  @Override
  public void teleopInit() {
    teleopInitCounter++;
    System.out.println("Teleop Init completed!");
  }

  /**
   * This function is called periodically during operator control.
   */
  @Override
  public void teleopPeriodic() {
      telemetryUpdate();
  }

  /**
   * This function is called once when the robot is disabled.
   */
  @Override
  public void disabledInit() {
  }

  /**
   * This function is called periodically when disabled.
   */
  @Override
  public void disabledPeriodic() {
      telemetryUpdate();
  }

  /**
   * This function is called once when test mode is enabled.
   */
  @Override
  public void testInit() {
  }

  /**
   * This function is called periodically during test mode.
   */
  @Override
  public void testPeriodic() {
      drive.arcadeDrive(controller.getY(), controller.getX());
  }

  void telemetryUpdate(){
      double sampleTime = Timer.getFPGATimestamp()*1000;
      teleopInitCounterSig.addSample(sampleTime, teleopInitCounter);

  }
}
